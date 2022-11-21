-- CreateTable
CREATE TABLE "shopping_cart" (
    "id" UUID NOT NULL,
    "total" REAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" UUID NOT NULL,

    CONSTRAINT "shopping_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_cart_products" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "product_id" UUID NOT NULL,
    "shopping_cart_id" UUID NOT NULL,

    CONSTRAINT "shopping_cart_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopping_cart_user_id_key" ON "shopping_cart"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_cart_products_product_id_shopping_cart_id_key" ON "shopping_cart_products"("product_id", "shopping_cart_id");

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart_products" ADD CONSTRAINT "shopping_cart_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart_products" ADD CONSTRAINT "shopping_cart_products_shopping_cart_id_fkey" FOREIGN KEY ("shopping_cart_id") REFERENCES "shopping_cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
