import gql from 'graphql-tag';
import React from 'react';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { Button } from 'antd';

const SUBSCRIBE_TITLE_UPADATE = gql`
      subscription onItemUpdate{
        itemUpdate {
          created_id
          title
        }
      }
`;
const MUTATION_UPDATE = gql`
  mutation UpdateItem {
    updateItem
  }
`;

const Page = () => {


  const [updateTodo] = useMutation(MUTATION_UPDATE)

  const { data, error, loading } = useSubscription(SUBSCRIBE_TITLE_UPADATE, {
    variables: {
      title: "My New Video"
    }
  });
  const updateHandle = () => {
    updateTodo();
  }

  if (loading) {
    return <div>Loading... <Button onClick={updateHandle}>update</Button></div>;
  };

  if (error) {
    return <div>Error! {error.message}</div>;
  };


  return (
    <div className="notification">
      <h2>hello ,welcom !</h2>
      <Button onClick={updateHandle}>update</Button>

      <p>
        TITLE: <strong style={{color:'red'}}> {!loading && data.itemUpdate.title} </strong>
      </p>
      <p>
        created_id: <strong> {!loading && data.itemUpdate.created_id} </strong>
      </p>
    </div>
  );
}

export default Page;
