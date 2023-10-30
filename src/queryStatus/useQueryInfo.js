import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useCallback } from "react";

export function useQueryStatus() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState([]);

  const getStatus = useCallback(() => {
    return queryClient
      .getQueryCache()
      .getAll()
      .map((query) => query.state.status);
  }, [queryClient]);

  useEffect(() => {
    // Define a function to update status when a query changes
    const updateStatus = () => {
      const newStatus = getStatus();
      setStatus(newStatus);
    };

    // Subscribe to the onQueryChange event to listen for changes in query state
    const unsubscribe = queryClient.getQueryCache().subscribe(updateStatus);

    // Initial update of status
    updateStatus();

    return () => {
      // Unsubscribe from the event when the component unmounts
      unsubscribe();
    };
  }, [queryClient, getStatus]);

  return status;
}
