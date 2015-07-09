package controllers.web_socket

import akka.actor.ActorRef

/**
 * Created by ivan on 7/9/15.
 */
class Client(out: ActorRef) {

  def link = out
  var isNew = true
}
