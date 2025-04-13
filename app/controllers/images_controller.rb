class ImagesController < ApplicationController
  def index
    @images = Image.all
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      redirect_to images_path, notice: 'Imagem enviada com sucesso!'
    else
      render :new
    end
  end
  def show
    @image = Image.find(params[:id])
  end
  
  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    redirect_to images_path, notice: 'Imagem removida com sucesso!'
  end
  
  private

  def image_params
    params.require(:image).permit(:title, :file)
  end
end
