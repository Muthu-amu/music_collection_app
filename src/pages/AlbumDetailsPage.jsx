import React from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Col, Row, Table } from "antd";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Api from "../services/Api";
import styles from "../styles/AlbumDetailsPage.module.css";
import HeaderCard from "../components/HeaderCard";

const AlbumDetailsPage = () => {
  const { id } = useParams();


  const {
    data: album,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["album", id],
    queryFn: async () => {
      const response = await Api.get(`/collections/${id}`);
      return response.data;
    },
  });


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching album details: {error.message}</p>;


  const [hours, minutes, seconds] = album.totalDuration.split(":").map(Number);
  const formattedDuration = `${hours > 0 ? `${hours} hours ` : ""}${minutes} minutes ${seconds} seconds`;


  const columns = [
    { title: "Song", dataIndex: "title", key: "title" },
    { title: "Performers", dataIndex: "performers", key: "performers" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Size", dataIndex: "size", key: "size" }
  ];

  return (
    <>
      <Breadcrumb
        className={styles.breadcrumb}
        items={[
          { title: <Link to="/">Overview</Link>, key: "overview" },
          { title: album.name, key: "album" }
        ]}
      />

      <HeaderCard title={album.name} />

      <div className={styles.albumDetailsContainer}>
        <div className={styles.albumDetails}>
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            <Col span={4}>
              <div className={styles.detailItem}><span>Artist</span>{album.artist}</div>
            </Col>
            <Col span={4}>
              <div className={styles.detailItem}><span>Type</span>{album.type}</div>
            </Col>
            <Col span={4}>
              <div className={styles.detailItem}><span>Song Count</span>{album.songCount}</div>
            </Col>
            <Col span={4}>
              <div className={styles.detailItem}><span>Total Size</span>{album.totalSize}</div>
            </Col>
            <Col span={4}>
              <div className={styles.detailItem}><span>Total Duration</span>{formattedDuration}</div>
            </Col>
            <Col span={4}>
              <div className={styles.detailItem}><span>Released On</span>{format(new Date(album.releasedOn), "dd MMM yyyy")}</div>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={album.songs.map((song, index) => ({ ...song, key: index }))}
          rowKey="song"
          pagination={false}
        />
      </div>
    </>
  );
};

export default AlbumDetailsPage;
