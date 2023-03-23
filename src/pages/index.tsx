import {
  getStoryblokApi,
  ISbStoriesParams,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";

const App = ({
  story,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  story = useStoryblokState(story);

  return (
    <>
      <header>
        <h1>{story ? story.name : "My Site"}</h1>
      </header>

      <StoryblokComponent blok={story.content} />
    </>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the query object
  const insideStoryblok = context.query._storyblok;

  let slug = "home";

  let sbParams: ISbStoriesParams = {
    version: "draft", // or 'draft'
  };

  if (insideStoryblok) {
    sbParams.version = "draft";
  }

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
  };
};
