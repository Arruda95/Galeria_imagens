class Image < ApplicationRecord
  # Configuração do Active Storage para anexar arquivos
  has_one_attached :file
  
  # Validações dos campos
  validates :title, presence: true, length: { minimum: 3, maximum: 50 }
  validates :description, length: { maximum: 500 }
  validates :file, presence: true
  
  # Validação personalizada para a imagem
  validate :acceptable_image

  private

  def acceptable_image
    return unless file.attached?

    # Verifica o tamanho do arquivo (máximo 5MB)
    unless file.blob.byte_size <= 5.megabyte
      errors.add(:file, "deve ser menor que 5MB")
    end

    # Verifica o tipo do arquivo
    acceptable_types = ["image/jpeg", "image/png", "image/gif"]
    unless acceptable_types.include?(file.content_type)
      errors.add(:file, "deve ser um JPEG, PNG ou GIF")
    end
  end
end
