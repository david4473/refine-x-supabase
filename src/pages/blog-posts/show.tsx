import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import {
  Show,
  TagField,
  TextField,
  MarkdownField,
  DateField,
} from "@refinedev/antd";
import { Typography, Space } from "antd";

const { Title, Text } = Typography;

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.categoryId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Title</Title>
      <MarkdownField value={record?.title} />
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Title level={5}>Category</Title>
      {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
      <Title level={5}>Created At</Title>
      <DateField value={record?.created_at} />
      <Title level={5}>Videos</Title>
      <Space wrap>
        {record?.videos ? (
          record?.videos.map((vid: any) => <Text>{vid.url}</Text>)
        ) : (
          <Text>No videos found</Text>
        )}
      </Space>
    </Show>
  );
};
