package controllers

import java.io.File

import controllers.web_socket.{Clients, Client, MyWebSocketActor}
import play.api.Play.current
import play.api.mvc._

class Application extends Controller {

  def index = Action {implicit request =>
    Ok(views.html.socket.ws_connector("Your new application is ready."))
  }


  def webSocketShare(sessionId:String) = WebSocket.acceptWithActor[String, String] { request =>
    out =>
      val client = new Client(out, sessionId)
      Clients.allClients += client
      MyWebSocketActor.props(client)
  }


  def connectSession(id:String) = Action {implicit request =>

    Ok(views.html.socket.ws_connector(id))
  }


  def saveImage(sessionId:String) = Action(parse.multipartFormData) {implicit request =>
    val image_count = request.body.asFormUrlEncoded.getOrElse("pic_count", Seq("0")).head.toInt
    (0 until image_count).map {imageNumber =>
      request.body.file("pic" + imageNumber).map { picture =>
        val filename = picture.filename
        val contentType = picture.contentType
        val sessionDir = new File(s"./public/images/chat/$sessionId")
        if(!sessionDir.exists()) {
          sessionDir.mkdir()
        }
        val file: File = new File(s"./public/images/chat/$sessionId/${imageNumber + 1}.png")
        file.getAbsoluteFile.delete()
        picture.ref.moveTo(file.getAbsoluteFile)
      }
    }
    Ok("")
  }


  def sessionInfo(sessionId:String) = Action {implicit request =>
    val sessionDir = new File(s"./public/images/chat/$sessionId")
    if(!sessionDir.exists())
      sessionDir.mkdir()
    if(sessionDir.listFiles().isEmpty)
      Ok("")
    else
      Ok(sessionDir.listFiles().map(_.getName).mkString("_"))
  }

  def ScienceRouting(scienceName:String) = Action { implicit request =>
    Ok(views.html.science.physics.main(scienceName))
  }


}


