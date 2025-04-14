class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :edit, :update, :destroy]

  def index
    @images = Image.order(created_at: :desc).page(params[:page]).per(12)
  end

  def show
  end

  def new
    @image = Image.new
  end

  def edit
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      redirect_to @image, notice: 'Imagem criada com sucesso!'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @image.update(image_params)
      redirect_to @image, notice: 'Imagem atualizada com sucesso!'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @image.destroy
    redirect_to images_url, notice: 'Imagem removida com sucesso!'
  end

  private

  def set_image
    @image = Image.find(params[:id])
  end

  def image_params
    params.require(:image).permit(:title, :description, :file)
  end
end
