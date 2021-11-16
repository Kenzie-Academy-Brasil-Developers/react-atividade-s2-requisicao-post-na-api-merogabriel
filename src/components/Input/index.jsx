const Input = ({ register, name, error, ...rest }) => {
  return (
    <div>
      <div>
        <input {...register(name)} {...rest} />
      </div>
      {error && <span>{error} </span>}
    </div>
  );
};

export default Input;
