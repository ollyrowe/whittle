export class GraphUtils {
  /**
   * Traverses a graph of nodes using a depth-first search algorithm,
   * returning connected nodes which are found in order.
   *
   * @param startNode - the first node.
   * @param getConnectedNodes - function which returns the nodes connected to a given node.
   * @returns array of connected nodes.
   */
  static depthFirstSearch<T>(
    startNode: T,
    getConnectedNodes: (node: T) => T[]
  ): T[] {
    return GraphUtils.discoverNodes(startNode, getConnectedNodes);
  }

  /**
   * Recursive method which discovers all connected nodes on a graph.
   *
   * @param node - the current node.
   * @param getConnectedNodes - function which returns the nodes connected to a given node.
   * @param discoveredNodes - array of already discovered nodes.
   * @returns array of connected nodes.
   */
  private static discoverNodes<T>(
    node: T,
    getConnectedNodes: (node: T) => T[],
    discoveredNodes: T[] = []
  ): T[] {
    if (!discoveredNodes.includes(node)) {
      discoveredNodes.push(node);

      const adjacentNodes = getConnectedNodes(node);

      adjacentNodes.forEach((node) =>
        GraphUtils.discoverNodes(node, getConnectedNodes, discoveredNodes)
      );
    }

    return discoveredNodes;
  }
}
