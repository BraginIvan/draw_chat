package controllers

import akka.actor.ActorRef
import controllers.web_socket.Client

/**
 * Created by ivan on 6/3/15.
 */
object StupidVar {

  val a: scala.collection.mutable.Map[Client, String] = scala.collection.mutable.Map.empty[Client, String]
}
