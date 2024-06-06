const convertTextToPdf = async (text: string) => {
  try {
    const result = await fetch(
      `${process.env.REACT_APP_API}?apiKey=${process.env.REACT_APP_API}`
    );
    return result;
  } catch (error) {
    throw new Error("The conversion did not go according to plan");
  }
};

export { convertTextToPdf };
