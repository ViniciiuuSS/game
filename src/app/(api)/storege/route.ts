import { NextRequest, NextResponse } from "next/server";
import { insertDocument, updateDocument, findDocuments } from "@/lib/mongodbApi";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { score, id } = body;

    if (!id) {
      const data = await insertDocument("Game", "score", {
        score: score,
      });

      return NextResponse.json({
        success: true,
        id: data.insertedId,
        score: score,
      });
    } else {
      const documents = await findDocuments("Game", "score", { _id: id });

      if (!documents || documents.length === 0) {
        return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });
      }

      await updateDocument("Game", "score", { _id: id }, { score: score });

      return NextResponse.json({
        success: true,
        id: id,
        score: score,
      });
    }
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { score, id } = body;
    if (!id) {
      const data = await insertDocument("Game", "score", {
        score: score,
      });

      return NextResponse.json({
        success: true,
        id: data.insertedId,
        score: score,
      });
    } else {
      const documents = await findDocuments("Game", "score", { _id: id });

      if (!documents || documents.length === 0) {
        return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });
      }

      await updateDocument("Game", "score", { _id: id }, { score: score });

      return NextResponse.json({
        success: true,
        id: id,
        score: score,
      });
    }
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const documents = await findDocuments("Game", "score", { _id: id });

    if (!documents || documents.length === 0) {
      return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });
    }

    const document = documents[0];
    return NextResponse.json({
      id: document._id,
      score: document.score,
    });
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    return NextResponse.json({ error: "Erro ao buscar documento" }, { status: 500 });
  }
}
