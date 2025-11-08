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
  const { droppableRects, collisionRect } = args;

  if (!collisionRect) {
    return closestCenter(args);
  }

  const pointerY = collisionRect.top + collisionRect.height / 2;
  const pointerCollisions = pointerWithin(args);

  if (pointerCollisions.length > 0) {
    // 가장 작은 collision 찾기 (중첩된 경우 가장 안쪽 것)
    const smallest = findSmallestCollision(pointerCollisions, droppableRects);

    if (smallest) {
      const rect = droppableRects.get(smallest.id);
      if (!rect) return [smallest];

      const data = smallest.data?.droppableContainer?.data?.current;
      const hasChildren = data?.meta?.hasChildren || data?.canHaveChildren;

      // hasChildren이 없는 경우: 정렬만 가능
      if (!hasChildren) {
        smallest.data = {
          ...smallest.data,
          intent: "sort",
          direction: pointerY < rect.top + rect.height / 2 ? "before" : "after",
        };
        return [smallest];
      }

      const edgeThreshold = 0.2; // 상하 20% 영역
      const topEdge = rect.top + rect.height * edgeThreshold;
      const bottomEdge = rect.bottom - rect.height * edgeThreshold;

      // 위쪽 가장자리 (20%) - 정렬 의도
      if (pointerY < topEdge) {
        smallest.data = {
          ...smallest.data,
          intent: "sort",
          direction: "before",
        };
        return [smallest];
      }

      // 아래쪽 가장자리 (20%) - 정렬 의도
      if (pointerY > bottomEdge) {
        smallest.data = {
          ...smallest.data,
          intent: "sort",
          direction: "after",
        };
        return [smallest];
      }

      // 중앙 영역 (60%) - 중첩 의도
      smallest.data = {
        ...smallest.data,
        intent: "nest",
      };
      return [smallest];
    }
  }

  const rectCollisions = rectIntersection(args);
  if (rectCollisions.length > 0) {
    const smallest = findSmallestCollision(rectCollisions, droppableRects);

    if (smallest) {
      const rect = droppableRects.get(smallest.id);
      if (rect) {
        const data = smallest.data?.droppableContainer?.data?.current;
        const hasChildren = data?.meta?.hasChildren || data?.canHaveChildren;

        if (!hasChildren) {
          smallest.data = {
            ...smallest.data,
            intent: "sort",
            direction:
              pointerY < rect.top + rect.height / 2 ? "before" : "after",
          };
        } else {
          // 중앙에 더 가까우면 nest, 가장자리면 sort
          const edgeThreshold = 0.2;
          const topEdge = rect.top + rect.height * edgeThreshold;
          const bottomEdge = rect.bottom - rect.height * edgeThreshold;

          if (pointerY < topEdge) {
            smallest.data = {
              ...smallest.data,
              intent: "sort",
              direction: "before",
            };
          } else if (pointerY > bottomEdge) {
            smallest.data = {
              ...smallest.data,
              intent: "sort",
              direction: "after",
            };
          } else {
            smallest.data = {
              ...smallest.data,
              intent: "nest",
            };
          }
        }
      }
      return [smallest];
    }

    return rectCollisions;
  }

  // 3단계: closestCenter로 최종 fallback
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
