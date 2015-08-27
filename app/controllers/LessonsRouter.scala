package controllers

import play.api.mvc.{Action, Controller}

/**
 * Created by bragi_000 on 26.08.2015.
 */
class LessonsRouter extends Controller {


  def ScienceRouting(theme:String, lesson:Int, action:String) = Action { implicit request =>
    theme match {
      case "kinematics" => lesson match {
        case 1 => Ok (views.html.science.physics.kinematics.lesson1.main (action))
        case 2 => Ok (views.html.science.physics.kinematics.lesson2.main (action))
      }
    }
  }

  def  getLessons(theme:String) = Action { implicit request =>


        Ok ("")

  }



}
