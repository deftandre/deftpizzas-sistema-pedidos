import { useCallback, useEffect, useState } from "react";
import { db } from "services/firebase";
import { useMounted } from "hooks";

function useCollection(collection) {
    const [data, setData] = useState(null);

    const mounted = useMounted();

    const orderBySizes = useCallback(
        (collection) => {
            return collection === "pizzasSizes"
                ? db
                      .collection(collection)
                      .orderBy("size", "asc")
                      .get()
                      .then((querySnapshot) => {
                          let docs = [];

                          querySnapshot.forEach((doc) => {
                              docs.push({
                                  id: doc.id,
                                  ...doc.data(),
                              });
                          });

                          if (mounted.current) {
                              setData(docs);
                          }
                      })
                : db
                      .collection(collection)
                      .get()
                      .then((querySnapshot) => {
                          let docs = [];

                          querySnapshot.forEach((doc) => {
                              docs.push({
                                  id: doc.id,
                                  ...doc.data(),
                              });
                          });

                          if (mounted.current) {
                              setData(docs);
                          }
                      });
        },
        [mounted]
    );

    useEffect(() => {
        orderBySizes(collection);
    }, [orderBySizes, collection]);

    return data;
}

export default useCollection;
