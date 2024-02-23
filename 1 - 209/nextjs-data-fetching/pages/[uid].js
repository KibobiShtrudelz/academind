export default function UserProfilePage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      id: `userid-${params.uid}`,
    },
  };
}
