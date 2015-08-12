package controllers.web_socket

import akka.actor.ActorRef

/**
 * Created by ivan on 7/9/15.
 */

object Clients {
  val allClients = scala.collection.mutable.Set.empty[Client]
  def removeClient(client:Client) =  allClients.-=(client)
  def sessionClients(sessionId:String) =  allClients.filter(_.session == sessionId).toSeq

}

class Client(out: ActorRef, sessionId: String) {
  def session = sessionId
  def link = out
  var isNew = true
}
