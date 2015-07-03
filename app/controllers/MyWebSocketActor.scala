package controllers

import akka.actor._
import play.api.libs.json.JsValue
import play.mvc.WebSocket

import scala.collection.mutable.ArrayBuffer

object MyWebSocketActor {
  def props(out: ActorRef, id:String) = Props(new MyWebSocketActor(out, id))
}



class MyWebSocketActor(out: ActorRef, id:String) extends Actor {

  def receive = {
    case msg: String =>
      StupidVar.a.filter(_._2 == id).foreach(v => v._1 ! msg)

  }

  override def postStop() = {

  }
}
