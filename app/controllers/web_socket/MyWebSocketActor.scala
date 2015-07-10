package controllers.web_socket

import akka.actor._
import controllers.StupidVar


object MyWebSocketActor {
  def props(client: Client) = Props(new MyWebSocketActor(client))
}

class MyWebSocketActor(client: Client) extends Actor {


  def receive = {

    case msg: String =>
      val sessionUsers = StupidVar.a.filter(_.session == this.client.session)
      if(msg == "new_") {
        val sessionFriends = sessionUsers.filter(_.link != this.client.link)
        if(sessionFriends.isEmpty)
          this.client.isNew = false
        sessionFriends.foreach(v => v.link ! msg)
        sessionFriends.headOption.foreach(_.link ! "upload_")
      }
      if(msg == "synchronize") {
        sessionUsers.filter(v => v.isNew).foreach{v =>
          v.isNew = false
          v.link ! msg
        }

      }
      else
        sessionUsers.foreach(v => v.link ! msg)

  }

  override def postStop() = {
    StupidVar.a - this.client
  }
}
