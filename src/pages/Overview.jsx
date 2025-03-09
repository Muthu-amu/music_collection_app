import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Table, Spin, Alert, Button, Checkbox, Dropdown, Space } from "antd";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Api from "../services/Api";
import { SearchOutlined } from "@ant-design/icons";
import styles from "../styles/Overview.module.css";
import HeaderCard from "../components/HeaderCard";

const Overview = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["collections"],
    queryFn: () => Api.get("/collections").then((res) => res.data),
  });

  if (isError) return <Alert message="Failed to load collections" type="error" />;

  const filteredData = selectedTypes.length
    ? data.filter((item) => selectedTypes.includes(item.type))
    : data;

  const typeOptions = ["EP", "Album", "Single"];

  const handleTypeChange = (checked, type) => {
    setSelectedTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const typeMenu = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {typeOptions.map((type) => (
        <Checkbox
          key={type}
          checked={selectedTypes.includes(type)}
          onChange={(e) => handleTypeChange(e.target.checked, type)}
        >
          {type}
        </Checkbox>
      ))}
    </div>
  );

  const columns = [
    {
      title: "Collection Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <span>{text}</span>
          <br />
          <span style={{ color: "#677A90" }}>{record.artist}</span>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Song Count",
      dataIndex: "songCount",
      key: "songCount",
    },
    {
      title: "Duration",
      dataIndex: "totalDuration",
      key: "totalDuration",
    },
    {
      title: "Size",
      dataIndex: "totalSize",
      key: "totalSize",
    },
    {
      title: "Released On",
      dataIndex: "releasedOn",
      key: "releasedOn",
      render: (text) => format(new Date(text), "dd MMM yyyy, hh:mma"),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Link to={`/album/${record.id}`}>
          <Button type="primary" icon={<EyeOutlined />} className={styles.viewDetails}>
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <HeaderCard title="Overview" />

      <div className={styles.overviewContainer}>
        <div className={styles.header}>

          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            className={styles.searchInput}
            allowClear
          />

          <Dropdown menu={{ items: [{ key: "typeMenu", label: typeMenu }] }} trigger={["click"]}>
            <Space.Compact
              className={
                selectedTypes.length > 0
                  ? styles.filterButton_Selected
                  : styles.filterButton
              }
            >
              Type {selectedTypes.length > 0 ? `(${selectedTypes.length})` : ""} <DownOutlined style={{ marginLeft: "8px", fontSize: "12px", marginTop: "1px" }} />
            </Space.Compact>
          </Dropdown>
        </div>

        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={false}
          />
        </Spin>
      </div>
    </>
  );
};

export default Overview;
