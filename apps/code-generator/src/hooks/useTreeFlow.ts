import { useMemo } from "react";
import { useTreeStore } from "../store/treeStore";
import { buildTreeFlowLayout } from "../utils/buildTreeFlowLayout";

export const useTreeFlow = () => {
  const { tree } = useTreeStore();

  const { nodes, edges } = useMemo(() => {
    return buildTreeFlowLayout(tree);
  }, [tree]);

  return { nodes, edges };
};
