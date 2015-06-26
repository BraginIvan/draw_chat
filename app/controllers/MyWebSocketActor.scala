package controllers

import akka.actor._
import play.api.libs.json.JsValue
import play.mvc.WebSocket

import scala.collection.mutable.ArrayBuffer

object MyWebSocketActor {
  def props(out: ActorRef) = Props(new MyWebSocketActor(out))
}



class MyWebSocketActor(out: ActorRef) extends Actor {

  def receive = {
    case msg: String =>
      StupidVar.a.foreach(_ ! msg)

  }

  override def postStop() = {

  }
}
