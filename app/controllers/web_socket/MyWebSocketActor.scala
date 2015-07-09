package controllers.web_socket

import akka.actor._
import controllers.StupidVar


object MyWebSocketActor {
  def props(client: Client, id:String) = Props(new MyWebSocketActor(client, id))
}

class MyWebSocketActor(client: Client, id:String) extends Actor {


  def receive = {

    case msg: String =>
      val sessionUsers = StupidVar.a.filter(_._2 == id)
      if(msg == "new_") {
        val sessionFriends = sessionUsers.filter(_._1.link != this.client.link)
        if(sessionFriends.isEmpty)
          this.client.isNew = false
        sessionFriends.foreach(v => v._1.link ! msg)
        sessionFriends.headOption.foreach(_._1.link ! "upload_")
      }
      if(msg == "synchronize") {
        sessionUsers.filter(v => v._1.isNew).foreach{v =>
          v._1.isNew = false
          v._1.link ! msg
        }

      }
      else
        sessionUsers.foreach(v => v._1.link ! msg)

  }

  override def postStop() = {
    StupidVar.a - this.client
  }
}
