function cardStruture() {
  return `<div class="col-lg-3 col-md-6 col-sm-12 vehicle-item" data-type="cars" data-name="luxury sedan mercedes">
                <div class="vehicle-card">
                    <img src="/placeholder.svg?height=200&width=300" alt="Luxury Sedan" class="vehicle-image">
                    <div class="vehicle-info">
                        <h3 class="vehicle-title">Luxury Sedan</h3>
                        <p class="product-description">Product Description</p>
                        <div class="pricing-info">
                            <div class="pricing-item">
                                <span class="pricing-label">Per day</span>
                                <span class="pricing-value highlight-price">500/-</span>
                            </div>
                            <div class="pricing-item">
                                <span class="pricing-label">24hrs valid minimum 5hrs</span>
                                <span class="pricing-value">300/-</span>
                            </div>
                            <div class="pricing-item">
                                <span class="pricing-label">Per hour</span>
                                <span class="pricing-value">60/-</span>
                            </div>
                            <div class="pricing-item">
                                <span class="pricing-label">150kms limit (no fuel)</span>
                                <span class="pricing-value">Included</span>
                            </div>
                            <div class="pricing-item">
                                <span class="pricing-label">Extra km</span>
                                <span class="pricing-value">3/-</span>
                            </div>
                            <div class="pricing-item">
                                <span class="pricing-label">1 to 5kms below delivery charges</span>
                                <span class="pricing-value">100/-</span>
                            </div>
                        </div>
                        <div class="vehicle-features">
                            <span class="feature-tag">AC</span>
                            <span class="feature-tag">GPS</span>
                            <span class="feature-tag">Leather</span>
                        </div>
                        <button class="book-btn">Book Now</button>
                    </div>
                </div>
            </div>`;
}
