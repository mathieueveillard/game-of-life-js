export type LifeStatus = "DEAD" | "ALIVE";

export function computeLifeStatusOnNextGeneration(actualLifeStatus: LifeStatus, numberOfNeighbors: number): LifeStatus {
  function convertToLifeStatus(b: boolean): LifeStatus {
    return b ? "ALIVE" : "DEAD";
  }

  if (actualLifeStatus === "DEAD") {
    return convertToLifeStatus(numberOfNeighbors === 3);
  }
  return convertToLifeStatus(numberOfNeighbors === 2 || numberOfNeighbors === 3);
}
