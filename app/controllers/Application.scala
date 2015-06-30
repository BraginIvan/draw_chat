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
    val image_count = request.body.asFormUrlEncoded.getOrElse("pic_count", Seq("0")).head.toInt
    (0 until image_count).map {imageNumber =>
      request.body.file("pic" + imageNumber).map { picture =>
        val filename = picture.filename
        val contentType = picture.contentType
        val file: File = new File(s"/home/ivan/$imageNumber.png")
        file.getAbsoluteFile.delete()
        picture.ref.moveTo(file.getAbsoluteFile)
      }
    }
    Ok("")
  }



}


