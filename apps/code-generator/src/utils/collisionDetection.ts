import {
  closestCenter,
  pointerWithin,
  rectIntersection,
  type CollisionDetection,
  type Collision,
} from "@dnd-kit/core";

/**
 * 중첩된 droppable 영역에서 가장 안쪽(작은) 영역을 우선 선택하는 collision detection
 */
export const nestedDroppableCollision: CollisionDetection = (args) => {
  // pointerWithin으로 포인터 아래의 모든 droppable 찾기
  // Layout 컴포넌트들은 droppable area로 선언되기 때문에 내부에 중첩적으로 droppable한 영역 있을 수 있음
  const pointerCollisions = pointerWithin(args);
  const { droppableRects, collisionRect } = args;

  if (pointerCollisions.length > 0) {
    const smallest = findSmallestCollision(pointerCollisions, droppableRects);

    if (smallest && collisionRect) {
      const rect = droppableRects.get(smallest.id);
      if (rect) {
        // pointer 위치가 특정 노드 앞인지 뒤인지 계산 (insert 시에 단순 append가 아닌 before인지 after인지 계산 위해 pointer 위치 계산 필요)
        const pointerY = collisionRect.top + collisionRect.height / 2;
        const midY = rect.top + rect.height / 2;

        smallest.data = {
          ...smallest.data,
          direction: pointerY < midY ? "before" : "after",
        };
      }
      return [smallest];
    }
  }

  const rectCollisions = rectIntersection(args);
  if (rectCollisions.length > 0) {
    const smallest = findSmallestCollision(rectCollisions, droppableRects);
    return smallest ? [smallest] : rectCollisions;
  }

  return closestCenter(args);
};

/**
 * Collision 목록에서 가장 작은 영역을 가진 것을 찾기
 */
function findSmallestCollision(
  collisions: Collision[],
  droppableRects: Parameters<CollisionDetection>[0]["droppableRects"]
): Collision | undefined {
  if (!collisions || collisions.length === 0) return undefined;

  let smallest = collisions[0];
  let smallestArea = Infinity;

  for (const collision of collisions) {
    const rect = droppableRects.get(collision.id);
    if (rect) {
      const area = rect.width * rect.height;
      if (area < smallestArea) {
        smallestArea = area;
        smallest = collision;
      }
    }
  }

  return smallest;
}

/**
 * 디버깅용 collision detection - 모든 collision 정보를 로깅
 */
export const debugCollisionDetection: CollisionDetection = (args) => {
  const pointer = pointerWithin(args);
  const rect = rectIntersection(args);
  const center = closestCenter(args);

  console.log("🔍 Collision Detection Debug:", {
    pointerCollisions: pointer.map((c) => ({ id: c.id, data: c.data })),
    rectCollisions: rect.map((c) => ({ id: c.id, data: c.data })),
    centerCollisions: center.map((c) => ({ id: c.id, data: c.data })),
  });

  return nestedDroppableCollision(args);
};
