import { BaseEdge, getStraightPath } from "@xyflow/react";
import { type GetBezierPathParams } from "@xyflow/react";

type CustomEdgeProps = {
  id: string;
} & GetBezierPathParams;

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: CustomEdgeProps) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}
