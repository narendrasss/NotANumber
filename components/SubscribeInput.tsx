import React from "react";
import { CgSpinner } from "react-icons/cg";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { styled } from "~/stitches.config";
import { Row } from "./layout/Row";

enum FormEvent {
  Change,
  Submit,
  Saved,
}

enum FormState {
  Start,
  Loading,
  Done,
}

const machine = {
  [FormState.Start]: {
    [FormEvent.Submit]: FormState.Loading,
  },
  [FormState.Loading]: {
    [FormEvent.Saved]: FormState.Done,
  },
  [FormState.Done]: {
    [FormEvent.Change]: FormState.Start,
  },
};

const transition = (state: FormState, event: FormEvent) => {
  return machine[state][event] ?? state;
};

const submitButtonTypeMap = {
  [FormState.Start]: undefined,
  [FormState.Loading]: "loading",
  [FormState.Done]: "success",
};

export function SubscribeInput() {
  const [state, dispatch] = React.useReducer(transition, FormState.Start);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    dispatch(FormEvent.Submit);
    await subscribe(evt);
    dispatch(FormEvent.Saved);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="john@doe.com"
          onChange={() => dispatch(FormEvent.Change)}
        />
        <SubmitButton
          as={motion.button}
          center="all"
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 0.9 }}
          disabled={state === FormState.Loading}
          type={submitButtonTypeMap[state]}
        >
          {state === FormState.Start && (
            <Row center="all">
              <FaPaperPlane />
            </Row>
          )}
          {state === FormState.Loading && (
            <Row
              center="all"
              as={motion.span}
              animate={{ rotate: 360 }}
              transition={{
                type: "tween",
                duration: 1,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <CgSpinner />
            </Row>
          )}
          {state === FormState.Done && "🎉"}
        </SubmitButton>
      </InputGroup>
      {state === FormState.Done && (
        <SuccessText>
          Thanks! Check your inbox — we sent you a confirmation email.
        </SuccessText>
      )}
    </form>
  );
}

const SuccessText = styled("p", {
  marginTop: "$2",
  fontFamily: "$mono",
  fontSize: "$sm",
});

const InputGroup = styled("div", {
  border: "1px solid $gray8",
  borderRadius: 4,
  display: "flex",
  background: "$gray1",
  overflow: "hidden",
  alignItems: "center",
  paddingRight: 7,
});

const Label = styled("label", {
  display: "block",
  padding: "$3",
  borderRight: "1px solid $gray8",
  color: "$gray11",
  background: "$gray4",
});

const SubmitButton = styled(Row, {
  background: "$blue7",
  width: "$10",
  height: "$10",
  flexShrink: 0,
  borderRadius: 4,

  variants: {
    type: {
      success: {
        background: "$green7",
      },
      loading: {
        background: "$gray4",
      },
    },
  },
});

const Input = styled("input", {
  flexGrow: 1,
  background: "$gray1",
  padding: "0 $2",
});

function subscribe(evt: React.FormEvent<HTMLFormElement>) {
  evt.preventDefault();

  const { email } = Object.fromEntries(
    new FormData(evt.target as HTMLFormElement).entries()
  );
  if (!email) {
    return;
  }

  const params = new URLSearchParams({ email } as Record<string, string>);
  return new Promise((resolve, reject) => {
    window.fetch(`/api/subscribe?${params}`).then((response) => {
      if (response.ok) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}