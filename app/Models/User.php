<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use NotificationChannels\WebPush\HasPushSubscriptions;

class User extends Authenticatable implements FilamentUser, HasName
{
    use HasApiTokens, HasFactory, Notifiable, Prunable, HasPushSubscriptions;

    const TYPE_ADMIN = 'admin';
    const TYPE_GUEST = 'guest';
    const TYPE_REGISTERED = 'registered';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'username' => 'encrypted'
    ];

    public function achievements(): HasMany{
        return $this->hasMany(Achievement::class);
    }

    public function contentProgress(): HasMany{
        return $this->hasMany(ContentProgress::class);
    }

    public function courseProgress(): HasMany{
        return $this->hasMany(CourseProgress::class);
    }

    public function glossaryWordProgress(): HasMany{
        return $this->hasMany(GlossaryWordProgress::class);
    }

    public function prunable()
    {
        return static::where('role', self::TYPE_GUEST)
            ->where('created_at', '<', now()->subDays(3));
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->role === self::TYPE_ADMIN   && $this->hasVerifiedEmail();
    }

    public function getFilamentName(): string
    {
        return $this->username;
    }
}
