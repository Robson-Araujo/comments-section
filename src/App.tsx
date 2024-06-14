import { format } from 'date-fns';
import { useState } from "react"

interface CommentSend {
  email: string;
  dhSend: Date;
  comment: string;
}

export default function App() {
  const [commentSend, setCommentSend] = useState<CommentSend[]>(() => {
    const storedComments = localStorage.getItem("comments");
    if (!storedComments) return [];
    return JSON.parse(storedComments);
  });
  const [comment, setComment] = useState('');
  const [dhSend, setDhSend] = useState(new Date());
  const [email, setEmail] = useState('');

  const sendComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //previne o envio padrão do formulário
    setDhSend(new Date());
    setCommentSend((prevComments) => [
      ...prevComments,
      { email, dhSend, comment }
    ]);

    localStorage.setItem("comments", JSON.stringify([
      ...commentSend,
      { email, dhSend, comment }
    ]));

    setEmail('');
    setComment('');
  }

  //ordenando o array de comentários por dhSend em ordem decrescente
  const sortedComments = [...commentSend].sort((a, b) => b.dhSend.getTime() - a.dhSend.getTime());

  return (
    <div className={`flex flex-col bg-zinc-800 h-screen w-screen justify-center items-center`}>
      <div className={`bg-zinc-300 h-5/6 w-1/3 p-10`}>
        <div className={`text-black`}>
          <h2 className={`font-bold text-xl`}>Seção de Comentários</h2>
          <form className={`flex flex-col gap-2 mt-3`} action="" onSubmit={sendComment}>
            <label htmlFor="email">Email</label>
            <input
              className={`rounded pl-1`}
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="comment">Comentário</label>
            <textarea
              className={`h-24 rounded pl-1`}
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className={`border border-black rounded bg-zinc-200 hover:bg-zinc-300 transition`}>
              Enviar comentário
            </button>
          </form>
          <p className="mt-4 border-[1px] border-zinc-400 rounded"></p>
          {
            sortedComments.length > 0 ? sortedComments.map((commentSend) => (
              <div
                id={commentSend.email}
                className={`flex flex-col gap-1 mt-2`}
              >
                <p className={`font-bold`}>{commentSend.email}</p>
                <p>{format(commentSend.dhSend, 'dd/MM/yyyy HH:mm:ss')}</p>
                <p>{commentSend.comment}</p>
              </div>
            )) : `Seja o primeiro a comentar!`
          }
        </div>
      </div>
    </div>
  )
}