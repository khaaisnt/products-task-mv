"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../lib/axios/axiosInstance";
import { Button, ButtonGroup } from "@mui/material";
import { Add, Apps, TableChart } from "@mui/icons-material";
import ProductCard from "./components/productCard";
import ProductTable from "./components/productTable";

export default function ProductPage() {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  return (
    <div className="p-10">
      <div className="flex-wrap md:flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Product List Admin</h1>
          <p className="text-gray-600 font-light text-base">
            Manage your products effectively
          </p>
        </div>
        <Button
          sx={{
            borderRadius: 100,
            textTransform: "none",
            marginY: 2,
          }}
          href="/products/create"
          variant="contained"
        >
          Create Product
          <Add sx={{ marginLeft: 1, fontSize: "medium" }} />
        </Button>
      </div>

      <ButtonGroup variant="contained" sx={{ mb: 3 }}>
        <Button
          startIcon={<TableChart />}
          onClick={() => setViewMode("table")}
          variant={viewMode === "table" ? "contained" : "outlined"}
        >
          Table
        </Button>
        <Button
          startIcon={<Apps />}
          onClick={() => setViewMode("card")}
          variant={viewMode === "card" ? "contained" : "outlined"}
        >
          Card
        </Button>
      </ButtonGroup>

      {viewMode === "table" ? <ProductTable /> : <ProductCard />}
    </div>
  );
}
