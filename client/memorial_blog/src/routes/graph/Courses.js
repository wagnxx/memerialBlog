import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Card } from "antd";

// const query = gql`
//   query GetDogs {
//     dogs {
//       id
//       breed
//     }
//   }
// `;

// const ADD_TODO = gql`
//   mutation AddTodo($type: String!) {
//     addTodo(type: $type) {
//       id
//       type
//     }
//   }
// `;

const mutation = gql`
  mutation GetArtByIdAndLimt($id:Int! , $l:Int! ) {
    getArtByIdAndLimt(startId: $id, limit: $l) {
      title
      created_id
    }
  }
`;

const Courses = () => (
  <>
    <Query
      query={gql`
        {
          arts {
            created_id
            title
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error:(</p>;

        return data.arts.slice(0, 5).map(({ title, created_id }, idx) => (
          <Card
            key={idx}
            title={title}
            extra={<a href="/">More</a>}
            style={{ width: 300 }}
          >
            <p>{`${title} by ${title}`}</p>
          </Card>
        ));
      }}
    </Query>
    <Mutation mutation={mutation}>
      {(getItem, { loading, error, data }) => {
        // if (loading) return <p>Loading...</p>;
        // debugger
        // if (error) return <p>Error:(</p>;
        // getItem(2,3).then((res) => {
        //   debugger;
        //   return res.getArtByIdAndLimt
        //   .slice(0, 5)
        //   .map(({ title, created_id }, idx) => (
        //     <Card
        //       key={idx}
        //       title={title}
        //       extra={<a href="/">More</a>}
        //       style={{ width: 300 }}
        //     >
        //       <p>{`${title} by ${title}`}</p>
        //     </Card>
        //   ));
        // });

        return <button onClick={() => getItem({variables:{id:2,l:3}})}>mutation</button>;
      }}
    </Mutation>
  </>
);

export default Courses;
