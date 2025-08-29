function PersonalInformation() {
  return (
    <>
      <h2>Informações Pessoais</h2>

      <div>
        <div>
          <label>
            Nome:
            <input type="text" name="nome" />
          </label>

          <label>
            Sobrenome:
            <input type="text" name="sobrenome" />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input type="email" name="email" />
          </label>

          <label>
            Telefone:
            <input type="tel" name="telefone" />
          </label>
        </div>

        <div>
          <label>
            LinkedIn:
            <input type="text" name="linkedin" />
          </label>

          <label>
            Resumo:
            <textarea />
          </label>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;