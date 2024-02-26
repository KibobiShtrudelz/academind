export default function FeedbackDetailsPage() {
  return <div>Feedback Details Page</div>;
}

export async function getStaticProps({ params }) {
  const feedbackId = params.feedbackId;

  return {
    props: { feedbackId },
  };
}
