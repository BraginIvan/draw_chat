package controllers

import akka.actor.ActorRef
import controllers.web_socket.Client

/**
 * Created by ivan on 6/3/15.
 */
object Clients {
  val allClients = scala.collection.mutable.Set.empty[Client]
  def removeClient(client:Client) =  allClients.-(client)
  def sessionClients(sessionId:String) =  allClients.filter(_.session == sessionId).toSeq

}
