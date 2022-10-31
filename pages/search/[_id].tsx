import axios from 'axios';
import { NextPage, GetServerSideProps, GetStaticPropsContext } from 'next';

interface TeacherType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
  coins: number;
  courses: Array<string>;
  available_hours: Record<string, number[]>;
  available_locations: Array<string>;
  reviews: Record<string, unknown>[];
  appointments: Record<string, unknown>[];
}

export default function teacherProfilePage(props: TeacherType): NextPage {
  return (
    <div>
      <h1>
        Página do professor {props.name} #{props._id}
      </h1>
      <p>Pontuação: {props.coins}</p>
      <p>Telefone: {props.cellphone}</p>
      <ul>
        {props.appointments.map((aluno, index) => {
          return (
            <li key={index}>
              {aluno.student_name} - {aluno.student_id}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetStaticPropsContext
) => {
  const _id = context.query._id as string;
  const response = await axios.get<TeacherType>(
    `http://localhost:3000/api/teacher/${_id}`
  );
  const responseTeacher = response.data;
  return {
    props: responseTeacher,
  };
};
