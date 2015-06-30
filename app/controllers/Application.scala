package controllers

import java.io.{File, PrintWriter}

import akka.actor.ActorRef
import play.api._
import play.api.libs.Files.TemporaryFile
import play.api.libs.iteratee.{Enumerator, Iteratee}
import play.api.mvc.MultipartFormData.FilePart
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

  def javascriptRoutes = Action { implicit request =>
    Ok(
      Routes.javascriptRouter("jsRoutes")(
        routes.javascript.Application.saveImage
      )
    ).as("text/javascript")
  }

  def saveImage = Action(parse.multipartFormData) {implicit request =>
    request.body.file("myNewFileName").map { picture =>
      val filename = picture.filename
      val contentType = picture.contentType
      picture.ref.moveTo(new File(s"/home/ivan/$filename.png"))
      Ok("File uploaded")
    }.getOrElse {
      Redirect(routes.Application.index).flashing(
        "error" -> "Missing file")
    }

  }






}


