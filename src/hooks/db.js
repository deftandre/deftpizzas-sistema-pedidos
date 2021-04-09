import { useCallback, useEffect, useState } from "react";
import { db } from "services/firebase";
import { useMounted } from "hooks";
import useAuth from "./auth";

function useCollection(collection) {
    const [data, setData] = useState(null);
    const { userInfo } = useAuth();

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
                : collection === "orders"
                ? db
                      .collection(collection)
                      .where("userId", "==", userInfo.user.uid)
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
                : collection === "ordersRecused"
                ? db
                      .collection(collection)
                      .where("userId", "==", userInfo.user.uid)
                      .where("isView", "==", false)
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
        [mounted, userInfo]
    );

    useEffect(() => {
        orderBySizes(collection);
    }, [orderBySizes, collection]);

    return data;
}

export default useCollection;
