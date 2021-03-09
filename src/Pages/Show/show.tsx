import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";

const columns = [
  {
    title: "排名",
    dataIndex: "Rank",
    key: "Rank",
  },
  {
    title: "影片名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "评分",
    dataIndex: "star",
    key: "star",
  },
];
const Show: React.FC = () => {
  const [dataSource, setDataSource] = useState();
  const history = useHistory()
  useEffect(() => {
    axios.get("/api/showData").then((res) => {
      let result: any = [];
      Object.values(res.data?.data).forEach((ele) => {
        result = result.concat(ele);
      });
      setDataSource(result);
    });
  }, []);
  return (
    <div>
      <Button 
      type="primary" 
      onClick={()=>{
        history.push('/')
      }}
      >
        继续爬取
      </Button>
      <Table
      style={{ padding: "0 30px 30px 0" }}
      dataSource={dataSource}
      columns={columns}
    />
    </div>
  );
};

export default Show;
