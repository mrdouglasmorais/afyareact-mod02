import React, {
  useState,
  useCallback,
  FormEvent
} from 'react';

import { toast } from 'react-toastify';

import api from '../../service/api';
import { CardContent } from './styles';

interface IFormPostData {
  nome: string;
  login: string;
  cpf: string;
  senha: string;
}

const Form: React.FC = () => {

  const [formDataContent, setFormDataContent] = useState<IFormPostData>({} as IFormPostData);

  const [isLoad, setIsLoad] = useState<boolean>(false)

  const postSignUpData = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(!isLoad);

      api.post('usuarios', formDataContent).then(
        response => {
          toast.success('Cadastros realizado com sucesso!')
          setIsLoad(!isLoad);
        }
      ).catch(err => {
        toast.error('Ooops, falha no engano!')
        setIsLoad(!isLoad);
      })

    }, [formDataContent, isLoad]
  )

  return (
    <>
      <CardContent>
        {isLoad ?
          (
            <p>Carregando...</p>
          ) : (

            <form onSubmit={postSignUpData}>
              <input type="text" placeholder="Seu nome"
                onChange={e => { setFormDataContent({ ...formDataContent, nome: e.target.value }) }}
              />
              <input type="text" placeholder="Nome de usuário"
                onChange={e => { setFormDataContent({ ...formDataContent, login: e.target.value }) }}
              />
              <input type="text" placeholder="CPF"
                onChange={e => { setFormDataContent({ ...formDataContent, cpf: e.target.value }) }}
              />
              <input type="password" placeholder="Senha"
                onChange={e => { setFormDataContent({ ...formDataContent, senha: e.target.value }) }}
              />
              <button type="submit">Enviar</button>
            </form>
          )}
      </CardContent>
    </>
  );
}

export default Form;