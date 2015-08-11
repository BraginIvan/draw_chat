package controllers.web_socket

import akka.actor.Status.Success
import akka.actor._
import akka.util.Timeout
import controllers.Clients
import scala.concurrent.duration._


object MyWebSocketActor {
  def props(client: Client) = Props(new MyWebSocketActor(client))
}

class MyWebSocketActor(client: Client) extends Actor{
  val uploadDone = "uploadDone_([0-9]+)".r



  def receive = {

    case msg: String =>
      val sessionUsers = Clients.sessionClients(this.client.session)
      msg match {

        case "new_" =>
          val sessionFriends = sessionUsers.filter(_.link != this.client.link)
          if (sessionFriends.isEmpty) {
            this.client.isNew = false
            this.client.link ! "synchronize_"
          }else {
            sessionFriends.foreach(_.link ! msg)
            sessionFriends.head.link ! "upload_"
          }
        case uploadDone(activeLauncher) =>
          sessionUsers.filter(_.isNew).foreach{v =>
            v.isNew = false
            v.link ! "synchronize_" + activeLauncher
          }
        case _ @ m => sessionUsers.foreach(_.link !   m)
      }



  }

  override def postStop() = {
    Clients.removeClient(this.client)
  }


}
