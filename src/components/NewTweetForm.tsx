import { Button } from "~/components/Button";
import { ProfileImage } from "~/components/ProfileImage";
import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export const NewTweetForm = () => {
  const session = useSession();
  if (session.status !== "authenticated") {
    return;
  }

  return <Form />;
};

const Form = () => {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  const updateTextAreaSize = (textArea?: HTMLTextAreaElement) => {
    if (textArea === null || textArea === undefined) {
      return;
    }

    textArea.style.height = "0";
    textArea.style.height = `${textArea?.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  if (session.status !== "authenticated") {
    return null;
  }

  return (
    <form className="flex flex-col gap-2 border-b px-4">
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ height: 0 }}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
        />
      </div>

      <Button className="self-end">Tweet</Button>
    </form>
  );
};
