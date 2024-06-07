const convertTextToPdf = async (text: string) => {
  try {
    const response = await fetch(
      `http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Щось пішло не так: ${error.message}`);
    } else {
      throw new Error("Щось пішло не так");
    }
  }
};

export { convertTextToPdf };
