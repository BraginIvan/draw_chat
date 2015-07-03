package controllers

import akka.actor.ActorRef

/**
 * Created by ivan on 6/3/15.
 */
object StupidVar {

  val a: scala.collection.mutable.Map[ActorRef, String] = scala.collection.mutable.Map.empty[ActorRef, String]
}
