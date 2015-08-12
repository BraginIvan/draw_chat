package controllers.web_socket

import akka.actor.Status.Success
import akka.actor._
import akka.util.Timeout
import scala.concurrent.duration._


object MyWebSocketActor {
  def props(client: Client) = Props(new MyWebSocketActor(client))
}

class MyWebSocketActor(client: Client) extends Actor{
  val uploadDone = "uploadDone_([0-9]+)".r

  override def preStart() = {
    val sessionFriends = Clients.sessionClients(client.session).filter(_.link != this.client.link)
    if (sessionFriends.isEmpty) {
      client.isNew = false
      client.link ! "synchronize_"
    }else
      sessionFriends.last.link ! "upload_"
  }

  def receive = {

    case msg: String =>
      val sessionUsers = Clients.sessionClients(client.session)
      msg match {
        case uploadDone(activeLauncher) =>
          sessionUsers.filter(_.isNew).foreach{v =>
            v.isNew = false
            v.link ! "synchronize_" + activeLauncher
          }
        case _ @ m => sessionUsers.foreach(_.link !   m)
      }

  }

  override def postStop() = {
    Clients.removeClient(client)
  }


}
