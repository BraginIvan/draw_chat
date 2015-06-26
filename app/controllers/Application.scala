package controllers

import akka.actor.ActorRef
import play.api._
import play.api.libs.iteratee.{Enumerator, Iteratee}
import play.api.mvc.WebSocket.FrameFormatter
import play.api.mvc._
import play.api.Play.current
import play.api.libs.json._

import scala.concurrent.ExecutionContext

class Application extends Controller {


  def index = Action {implicit request =>
    Ok(views.html.index("Your new application is ready."))
  }


  def wstest = WebSocket.acceptWithActor[String, String] { request =>
    out =>
      StupidVar.a = out :: StupidVar.a
      MyWebSocketActor.props(out)
  }



}


