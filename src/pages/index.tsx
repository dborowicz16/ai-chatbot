import Head from "next/head";
import ChatComponent from "../../util/chat_component";

export default function Home() {
  return (
    <>
      <Head>
        <title>Example App</title>
        <meta
          name="description"
          content="Example app for web llm next compatibility"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
          <ChatComponent />
      </main>
    </>
  );
}