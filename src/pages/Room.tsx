import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button/Button";
import { RoomCode } from "../components/RoomCode/RoomCode";

import "../styles/room.scss";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../components/Question/Question";

type FirebaseQuestions = Record<
    string,
    {
        author: {
            name: string;
            avatar: string;
        };
        content: string;
        isAnswered: boolean;
        isHighlighted: boolean;
    }
>;

type Questions = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
};

type RoomParams = {
    id: string;
};

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState("");
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState("");

    const roomId = params.id as string;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on("value", (room) => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions =
                databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(
                ([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighlighted: value.isHighlighted,
                        isAnswered: value.isAnswered,
                    };
                }
            );

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });
    }, [roomId]);

    async function handleSendwQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === "") {
            return;
        }

        if (!user) {
            throw new Error("You must be logged in!");
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion("");
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (
                        <span>{questions.length} pergunta(s)</span>
                    )}
                </div>
                <form onSubmit={handleSendwQuestion}>
                    <textarea
                        placeholder="O que voce quer perguntar"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                            </div>
                        ) : (
                            <span>
                                Para enviar uma pergunta,{" "}
                                <button>faca seu login</button>.
                            </span>
                        )}

                        <Button type="submit" disabled={!user}>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
                <div className="question-list">
                    {questions.map((question) => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
