import React, { useState } from "react";
import AdminListComponent from "../../components/AdminComponent/AdminListComponent";
import { useGetAdminsQuery } from "../../Services/adminsApi";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import styles from "./AdminList.module.css";

const AdminList = () => {
  const { data: admins, isLoading, error } = useGetAdminsQuery();

  console.log(admins);
  return (
    <div className={styles.adminListPage}>
      {isLoading ? (
        <div className={styles.adminListLoader}>
          <VStack colorPalette="teal">
            <Spinner
              color="red.500"
              css={{ "--spinner-track-color": "colors.gray.200" }}
            />
            <Text css={{ color: "var(--charcoal-blue-grey-one-color)" }}>
              Loading...
            </Text>
          </VStack>
        </div>
      ) : (
        <AdminListComponent admins={admins.data} onDelete={() => {}} />
      )}
    </div>
  );
};
export default AdminList;
